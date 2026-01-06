// Page navigation
function showPage(id) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".assessment-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        /*
            Likert Scale (Final Mapping):
            0 = Never / Strongly Agree (healthy)
            1 = Sometimes / Agree
            2 = Often / Disagree
            3 = Always / Strongly Disagree (severe)
        */

        const q1 = getValue("q1");                // Distress
        const q2 = reverseScore(getValue("q2")); // Coping
        const q3 = reverseScore(getValue("q3")); // Motivation

        // DEMO RISK CALCULATION (No backend)
        const totalScore = q1 + q2 + q3;

        if (totalScore >= 7) {
            alert("⚠️ HIGH RISK DETECTED\nCounsellor will be notified.");
        }
        else if (totalScore >= 4) {
            alert("⚠️ MODERATE RISK DETECTED\nMonitor student wellbeing.");
        }
        else {
            alert("✅ No significant risk detected.");
        }

        form.reset();
    });
});

// Get selected radio value
function getValue(questionName) {
    const selected = document.querySelector(`input[name="${questionName}"]:checked`);
    return selected ? parseInt(selected.value, 10) : 0;
}

// Reverse scoring for positive questions
function reverseScore(value) {
    return 3 - value;
}
