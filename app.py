import httpx
from flask import Flask
from flask_restx import Resource, Api, reqparse, inputs, fields

app = Flask(__name__)
api = Api(app)

# Get rid of field mask parameter in documentation
app.config['RESTX_MASK_SWAGGER'] = False

website_response_model = api.model('WebsiteResponse', {
    'content': fields.String,
    'url': fields.String,
})


class WebsiteResponseData(object):
    def __init__(self, url, content):
        self.url = url
        self.content = content


website_request_parser = reqparse.RequestParser()
website_request_parser.add_argument('url', type=inputs.url, required=True)

httpx_request_error_model = api.model(
    'OutgoingRequestError',
    {'url': fields.String, 'message': fields.String, 'details': fields.String},
)


@api.errorhandler(httpx.RequestError)
@api.marshal_with(httpx_request_error_model, code=500)
def handle_httpx_request_error(error):
    return {'message': 'An error occurred while requesting the given URL.',
            'url': error.request.url,
            'details': '\n'.join(error.args)}


@api.route('/website')
class Website(Resource):

    @api.marshal_with(website_response_model)
    @api.expect(website_request_parser, validate=True)
    @api.response(500, description='The request to the given URL failed', model=httpx_request_error_model)
    def get(self):
        """
        Get the HTML of the given website.
        """
        args = website_request_parser.parse_args()
        url = args['url']

        response = httpx.get(url)
        return WebsiteResponseData(url=url, content=response.text)


api.add_resource(Website, '/website')

if __name__ == '__main__':
    app.run()
