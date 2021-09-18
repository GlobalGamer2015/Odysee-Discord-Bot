// Check if data exists before returning
function content_type(data) {
    if(data.data.claim.content_type) {
        const _content_type = data.data.claim.content_type;
        if(_content_type === "image/jpeg") {
            return "JPG";
        }
        if(_content_type === "image/png") {
            return "PNG";
        }
        if(_content_type === "image/gif") {
            return "GIF";
        }
        if(_content_type === "image/svg+xml") {
            return "SVG+XML";
        }
        if(_content_type === "video/mp4") {
            return "MP4";
        }
        if(_content_type === "text/markdown") {
            return "MARKDOWN";
        }
    }
}
function duration(data) {
    if(data.data.claim.duration) {
        if(data.data.claim.duration >= 60 || "60") {
            // Divide duration by 60 seconds since duration is in seconds
            const duration = data.data.claim.duration/60;
            const minutes = duration.toString().split('.');
            const _minutes = minutes[0];
            if(_minutes >= 2 || "2") {
                return `${_minutes} minutes`;
            }
            else {
                return `${_minutes} minute`;
            }
        }
        if(data.data.claim.duration <= 59 || "59") {
            if(data.data.claim.duration >= 2 || "2") {
                return `${data.data.claim.duration} seconds`;
            }
            else {
                return `${data.data.claim.duration} second`;
            }
        }
    }
}
function name(data) {
    if(data.data.claim.title) {
        return data.data.claim.title;
    }
}
function thumbnail(data) {
    if(data.data.claim.thumbnail_url) {
        return data.data.claim.thumbnail_url;
    }
}
function url(data,claim) {
    if(claim.items[0].short_url) {
        // Unable to use claim name or name for video url at the moment.
        //const claim_name = data.data.claim.name;
        const channelUrl = claim.items[0].short_url.replace('lbry://', 'https://www.odysee.com/');
        return `${channelUrl}`;///${claim_name}`;
    }
}

module.exports.content_type = content_type;
module.exports.duration = duration;
module.exports.name = name;
module.exports.thumbnail = thumbnail;
module.exports.url = url;