import json
import boto3

from boto3.dynamodb.conditions import Key, Attr

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    response = client.scan(
        TableName='www-balance',
        ConsistentRead = True
    );
    
    balance = {}
    
    for item in response['Items']:
        currency = item['Currency']['S']
        amount = item['Amount']['N']
        balance[currency] = amount
    
    return {
        'StatusCode': 200,
        'Message': 'Fetched successfully',
        'Balance': balance
    }