// export function validateInvestment(data) {
//   const errors = {};

//   if (!data.full_name || data.full_name.trim() === "") {
//     errors.full_name = "Full name is required";
//   }

//   if (!data.phone || !/^\+?[0-9]{7,15}$/.test(data.phone)) {
//     errors.phone = "Valid phone number is required";
//   }

//   if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
//     errors.email = "Invalid email format";
//   }

//   return { valid: Object.keys(errors).length === 0, errors };
// }
