const { Lbry } = require('lbry-sdk-nodejs/lib/sdk');
const fetch = require('node-fetch');

module.exports = function(msg,prefix,MessageEmbed) {
    let finished_results_claimInfo_arr = [];
    let search_results_claimId_arr = [];

	if(msg.content.startsWith(`${prefix} search`)) {
        const search = msg.content.replace(`${prefix} search `, '').split(" ");

        fetch(`https://lighthouse.odysee.com/search?s=${search}&size=3&from=0&claimType=file&mediaType=video,audio,text&nsfw=false`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(search_results => {
            search_results.forEach(function(result) {
                const claimId = result.claimId;
                search_results_claimId_arr.push({ claim_id: claimId });
            })

            Lbry.claim_search({claim_ids: [ search_results_claimId_arr[0].claim_id,search_results_claimId_arr[1].claim_id,search_results_claimId_arr[2].claim_id ]})
            .then(claimId_info => {
                const claim_0 = { url: claimId_info.items[0].canonical_url, claim_id: claimId_info.items[0].claim_id, name: claimId_info.items[0].name };
                const claim_1 = { url: claimId_info.items[1].canonical_url, claim_id: claimId_info.items[1].claim_id, name: claimId_info.items[1].name };
                const claim_2 = { url: claimId_info.items[2].canonical_url, claim_id: claimId_info.items[2].claim_id, name: claimId_info.items[2].name };

                finished_results_claimInfo_arr.push( claim_0,claim_1,claim_2 );

                const Embed = new MessageEmbed()
                    .setColor('#4f1c82')
                    .setTitle('Search results')
                    .setDescription(
                        `Result 1:
                            Name: \`\`${finished_results_claimInfo_arr[0].name}\`\`
                            Claim Id: \`\`${finished_results_claimInfo_arr[0].claim_id}\`\`
                            URL: \`\`${finished_results_claimInfo_arr[0].url}\`\`\n
                        Result 2:
                            Name: \`\`${finished_results_claimInfo_arr[1].name}\`\`
                            Claim Id: \`\`${finished_results_claimInfo_arr[1].claim_id}\`\`
                            URL: \`\`${finished_results_claimInfo_arr[1].url}\`\`\n
                        Result 3:
                            Name: \`\`${finished_results_claimInfo_arr[2].name}\`\`
                            Claim Id: \`\`${finished_results_claimInfo_arr[2].claim_id}\`\`
                            URL: \`\`${finished_results_claimInfo_arr[2].url}\`\``
                    )
                    .setTimestamp()
                    .addField('\u200B','Hosted by: [Odysee Chatter](https://www.odysee-chatter.com)', false);
		        msg.channel.send({ embeds: [Embed] });
            })
        })
    }
}