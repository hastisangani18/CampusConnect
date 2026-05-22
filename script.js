// LOGIN FORM
const loginForm = document.getElementById("loginForm");

if(loginForm){
    loginForm.addEventListener("submit", async function(event){
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try{
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            alert(data.message);

            if(data.success){
                localStorage.setItem("user", JSON.stringify(data.user));
                window.location.href = "dashboard.html";
            }

        } catch(error){
            alert("Server Error ❌");
            console.log(error);
        }
    });
}


// SIGNUP FORM
const signupForm = document.getElementById("signupForm");

if(signupForm){
    signupForm.addEventListener("submit", async function(event){
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if(password !== confirmPassword){
            alert("Passwords do not match ❌");
            return;
        }

        try{
            const response = await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password })
            });

            const data = await response.json();

            alert(data.message);

            if(data.success){
                window.location.href = "login.html";
            }

        } catch(error){
            alert("Server Error ❌");
            console.log(error);
        }
    });
}