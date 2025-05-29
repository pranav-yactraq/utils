import fs from 'fs';
var emails = fs.readFileSync('./email_tickets.json', 'utf-8');
emails = JSON.parse(emails);

const relevant_emails = [];
emails.forEach((email) => { if (email.from_agent === true) { relevant_emails.push(email) } })
console.log(relevant_emails.length)



// relevant_emails.forEach((email) => {
//     if(email)
// })
//
const email_gsps_analysis = {};
const URL = 'http://localhost:8081'

for (const email of relevant_emails) {
    try {
        const params = new URLSearchParams();
        params.append('language', 'en-US');
        params.append('text', email.excerpt);

        const response = await fetch(`${URL}/v2/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        const data = await response.json();
        email_gsps_analysis[email.id] = email;
        email_gsps_analysis[email.id].analysis = data;
        // Use a unique key, like email ID or index
    } catch (err) {
        console.error(`Fetch error for email: ${email.id}`, err);
    }
}

fs.writeFileSync('gsps_processedemails.txt', JSON.stringify(email_gsps_analysis, null, 2))
//
// !never use forEach with async await operations
// relevant_emails.forEach(async (email) => {
//     try {
//         const params = new URLSearchParams();
//         params.append('language', 'en-US');
//         params.append('text', `${email.excerpt}`);
//         const response = await fetch(`${URL}/v2/check`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: params
//         });
//         const data = await response.json();
//         email_gsps_analysis[relevant_emails] = data;
//     } catch (err) {
//         console.error('Fetch error:', err);
//     }
// })

console.log(email_gsps_analysis)
