import {NextApiRequest, NextApiResponse} from 'next';

function resetPreview(_request: NextApiRequest, response: NextApiResponse) {
	response.clearPreviewData().status(200).end();
}

export default resetPreview;
