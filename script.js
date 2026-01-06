
function showPage(id) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".assessment-form");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        /*
            Likert Scale:
            0 = Never / Strongly Agree (healthy)
            1 = Sometimes
            2 = Often
            3 = Always / Strongly Disagree (severe)
        */

        const q1 = getValue("q1");               
        const q2 = reverseScore(getValue("q2"));
        const q3 = reverseScore(getValue("q3")); 

        try {
            const response = await fetch("http://localhost:5000/api/assessment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    distress: q1,
                    coping: q2,
                    motivation: q3
                })
            });

            const data = await response.json();

            if (data.riskLevel === "HIGH_RISK") {
                alert("⚠️ HIGH RISK DETECTED\nCounsellor will be notified.");
            } 
            else if (data.riskLevel === "MODERATE") {
                alert("Moderate risk detected.\nMonitor student wellbeing.");
            } 
            else {
                alert("No significant risk detected.");
            }

            form.reset();

        } catch (error) {
            alert("Server error. Please try again later.");
            console.error(error);
        }
    });
});
function getValue(questionName) {
    const selected = document.querySelector(`input[name="${questionName}"]:checked`);
    return selected ? parseInt(selected.value, 10) : 0;
}

function reverseScore(value) {
    return 3 - value;
}
