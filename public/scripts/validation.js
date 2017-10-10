function isValid(form){
		let name=form.login;
		let email=form.email;
		let password=form.password;
		let repPassword=form.repPass;
		let loginErr=document.getElementById("login-err");
		let emailErr=document.getElementById("email-err");
		let passErr=document.getElementById("pass-err");
		let repassErr=document.getElementById("repass-err");
		let name_pattern=/^[a-zA-Z]+$/;
		let email_pattern=/\S+@\S+\.\S+/;
		let password_pattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z]{6,}$/;

		return !!(verifyName()&verifyEmail()&verifyPassword()&verifyPasswodEqual());

		function verifyName(){
			if(!name_pattern.test(name.value)){
				name.style.border="1px solid red";
				loginErr.textContent="Name is incorrect";
				return false;
			}
			else {
				name.style.border="1px solid grey";
				loginErr.innerHTML="";
				return true;
			}
		}
		
		function verifyEmail(){
			if(!email_pattern.test(email.value)){
				email.style.border="1px solid red";
				emailErr.textContent="Email is incorrect";
				return false;
			}
			else{
				email.style.border="1px solid grey";
				emailErr.innerHTML="";
				return true;
			}
		}

		function verifyPassword(){
			if(!password_pattern.test(password.value)){
				password.style.border="1px solid red";
				passErr.textContent="Password should be at least 6 characters long, contain 1 lowercase letter, 1 uppercase letter, 1 digit, no special symbols";
				return false;
			}
			else{
				password.style.border="1px solid grey";
				passErr.innerHTML="";
				return true;
			}
		}

		function verifyPasswodEqual(){
			if((password.value!=repPassword.value)||(!repPassword.value)){
				repPassword.style.border="1px solid red";
				repassErr.textContent="Fields 'Password' and 'Repeat password' should be equal";
				repPassword.focus();
				return false;
			}
			else{
				repPassword.style.border="1px solid grey";
				repassErr.innerHTML="";
				return true;
			}
		}
}