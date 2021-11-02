import {NextApiRequest, NextApiResponse} from 'next';

type EmailUsBody = Partial<
	Record<'name' | 'email' | 'phone' | 'message', string>
>;

async function emailUs(request: NextApiRequest, response: NextApiResponse) {
	const body: EmailUsBody = request.body;

	const subject = 'New Website enquiry';
	const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;

	const messageParts = [
		`From: ${body.name ?? ''} <${body.email ?? ''}>`,
		'To: Justin Beckwith <beckwith@google.com>',
		'Content-Type: text/html; charset=utf-8',
		'MIME-Version: 1.0',
		`Subject: ${utf8Subject}`,
		'',
		body.message
	];
	const message = messageParts.join('\n');

	console.log(message);

	response.status(204).end();
}

export default emailUs;
