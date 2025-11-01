export const inputData = [
    { 
        label: "Name", 
        name: "name", 
        placeholder: "John Doe", 
        type: "text", 
        required: true,
        minLength: 2,
        maxLength: 100
    },
    { 
        label: "Company", 
        name: "company", 
        placeholder: "Faux Company", 
        type: "text", 
        required: false,
        maxLength: 100,
    },
    { 
        label: "Email", 
        name: "email", 
        placeholder: "Example@email.com", 
        type: "email", 
        required: true,
    },
    { 
        label: "Phone", 
        name: "phone", 
        placeholder: "000 00 000 000", 
        type: "tel", 
        required: false,
        maxLength: 20
    },
];