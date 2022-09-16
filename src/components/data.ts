export const first = [
  {name: "first_name", label: "First Name", type: "text",required: true},
  {name: "last_name", label: "Last Name", type: "text",required: true},
  {name: "email", label: "Email", type: "email",required: true}
]
export const second = [
  {name: "age", label: "Age", type: "number", required: false},
  {name: "gender", label: "Gender", type: "select", required: false, options: {
    male: "Male",
    female: "Female"
  }},
  {name: "phone_number", label: "Phone Number", type: "number", required: true},
]