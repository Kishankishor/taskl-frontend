export default function Validation(fn, ln, em, ph, add1) {
  const errors = {};
  const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
  if (fn === "") {
    errors.fname = "First name is required";
  } else if (fn.length < 5) {
    errors.fname = "first name should be more than 5 characters";
  }
  if (ln === "") {
    errors.lname = "last name is required";
  } else if (fn.length < 5) {
    errors.lname = "last name should be more than 5 characters";
  }
  if (!emailpattern.test(em)) {
    errors.email = "Email is not correct";
  }
  if(add1 === ""){
    errors.adress1 = "Address is required"
  }
  return errors
}
