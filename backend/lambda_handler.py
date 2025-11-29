import json
from converter import yaml_to_json, json_to_yaml

def lambda_handler(event, context):
    try:
        route = event.get("rawPath", "")
        body = json.loads(event.get("body", "{}"))
        content = body.get("content", "")

        # Routes
        if route == "/convert/y2j":
            result = yaml_to_json(content)
            return success({"converted": result})

        elif route == "/convert/j2y":
            result = json_to_yaml(content)
            return success({"converted": result})

        # Root
        if route == "/":
            return success({"message": "AWS Lambda YAML <-> JSON Converter Running!"})

        return error("Invalid route")

    except Exception as e:
        return error(str(e))


def success(body_dict):
    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps(body_dict)
    }


def error(message):
    return {
        "statusCode": 400,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"error": message})
    }
