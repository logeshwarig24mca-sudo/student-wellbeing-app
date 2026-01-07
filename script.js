document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".assessment-form");
    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Get answers
        const distress = getValue("q1");    // negative question
        const coping = getValue("q2");      // positive question
        const motivation = getValue("q3");  // positive question

        let riskIndicators = 0;

        // Q1: High distress increases risk
        if (distress >= 2) riskIndicators++;

        // Q2: Low coping ability increases risk
        if (coping >= 2) riskIndicators++;

        // Q3: Low motivation increases risk
        if (motivation >= 2) riskIndicators++;

        let riskLevel = "NO_RISK";
        if (riskIndicators === 1) riskLevel = "MODERATE";
        if (riskIndicators >= 2) riskLevel = "HIGH_RISK";

        try {
            const response = await fetch("http://localhost:5000/api/assessment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    distress,
                    coping,
                    motivation
                })
            });

            const result = await response.json();

            alert(`Assessment Submitted Successfully\nRisk Level: ${result.riskLevel}`);

            form.reset();
        } catch (error) {
            alert("Error submitting assessment");
            console.error(error);
        }
    });
});

function getValue(questionName) {
    const selected = document.querySelector(`input[name="${questionName}"]:checked`);
    return selected ? parseInt(selected.value, 10) : 0;
}
