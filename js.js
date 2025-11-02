fetch('data.csv')
    .then(response => response.text())
    .then(csv => {
        const rows = csv
            .trim()
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(r => r.split(','));

        const headers = rows[0];
        const dataRows = rows.slice(1);

        let html = '<table border="1">';

        //Head
        html += '<thead><tr>';
        headers.forEach(header => html += `<th>${header.trim()}</th>`);
        html += '</tr></thead>';

        //Body
        html += '<tbody>';
        dataRows.forEach(row => {
            html += '<tr>';
            row.forEach((cell, index) => {
                const headerName = headers[index].trim();
                const cellValue = cell ? cell.trim() : '';
                if (headerName === 'GitHub_Link') {
                    if (cellValue !== '') {
                        html += `<td><a href="${cellValue}" target="_blank">GitHub Link</a></td>`;
                    } else {
                        html += '<td>-</td>';
                    }
                } else if (headerName === 'Live_Demo') {
                    if (cellValue !== '') {
                        html += `<td><a href="${cellValue}" target="_blank">Live Demo</a></td>`;
                    } else {
                        html += '<td>-</td>';
                    }
                } else {
                    html += `<td>${cellValue}</td>`;
                }
            });
            html += '</tr>'
        })
        html += '</tbody></table>';
        document.getElementById("two").innerHTML = html;
        dark_mode_fun(localStorage.getItem("value") === "true")

    })
    .catch(err => console.error("Error loading CSV: ", err));

// Dark mode functionality
let Dark_mode_btn = document.getElementById("Dark_mode_btn"), bool_value = false;
if (localStorage.getItem("value")) {
    bool_value = localStorage.getItem("value") === 'true';
    dark_mode_fun(bool_value);
}
Dark_mode_btn.addEventListener("click", function () {
    bool_value = !bool_value;
    localStorage.setItem("value", bool_value);
    dark_mode_fun(bool_value);
})

function dark_mode_fun(bool_value) {
    // smooth transition
    document.body.style.transition = "all 0.3s ease-in-out";
    document.querySelectorAll("a, table, th, td, button, img").forEach(el => {
        el.style.transition = "all 0.3s ease-in-out";
    });
    if (bool_value) {
        document.getElementsByTagName("body")[0].style.backgroundColor = "#000";
        document.getElementsByTagName("body")[0].style.color = "#fff";
        document.getElementsByTagName("img")[0].style.borderColor = "#fff";
        document.getElementsByTagName("button")[0].style.backgroundColor = "#000";
        document.getElementsByTagName("button")[0].style.color = "#fff";
        document.getElementsByTagName("button")[0].innerText = "Light Mode";
        
        Array.from(document.getElementsByTagName("a")).forEach(a => {
            a.style.color = "#fff";
        })
        document.querySelectorAll("table, th, td").forEach(el => {
            el.style.border = "1px solid #fff";
        });
    } else {
        document.getElementsByTagName("body")[0].style.backgroundColor = "#EFEFEF";
        document.getElementsByTagName("body")[0].style.color = "#000";
        document.getElementsByTagName("img")[0].style.borderColor = "#000";
        document.getElementsByTagName("button")[0].style.backgroundColor = "#EFEFEF";
        document.getElementsByTagName("button")[0].style.color = "#000";
        document.getElementsByTagName("button")[0].innerText = "Dark Mode";
        Array.from(document.getElementsByTagName("a")).forEach(a => {
            a.style.color = "#0000EE";
        })
        document.querySelectorAll("table, th, td").forEach(el => {
            el.style.border = "1px solid #000";
        });
    }
}
