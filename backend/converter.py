import json
import yaml

def yaml_to_json(yaml_text):
    try:
        data = yaml.safe_load(yaml_text)
        return json.dumps(data, indent=4)
    except Exception as e:
        return str(e)

def json_to_yaml(json_text):
    try:
        data = json.loads(json_text)
        return yaml.dump(data, sort_keys=False)
    except Exception as e:
        return str(e)
