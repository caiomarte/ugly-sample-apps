import json
import boto3

from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal

dynamodb = boto3.resource('dynamodb', region_name='us-west-2')
table = dynamodb.Table('www-balance')

def lambda_handler(event, context):
    currency = event['Currency']
    credit = Decimal(event['Difference'])
    
    responseGet = table.get_item(
        Key = {'Currency': currency}
    )
    
    balance = responseGet['Item']['Amount']
    
    newBalance = round(balance + credit, 2)
    
    responseUpdate = table.update_item(
        Key = {'Currency': currency},
        UpdateExpression = 'set Amount=:a',
        ExpressionAttributeValues = {
            ':a': newBalance
        }
    )
    
    newResponseGet = table.get_item(
        Key = {'Currency': currency},
        ConsistentRead = True
    )
    
    currentBalance = newResponseGet['Item']['Amount']
    
    return {
        'StatusCode': 200,
        'Message': 'Calculated successfully',
        'Transaction': True,
        'Balance': currentBalance
    }