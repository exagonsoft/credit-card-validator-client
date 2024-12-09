
# Credit Card Validator App

![App Icon](./public/logo192.png)

A **React-powered application** designed to validate credit card numbers using the **Luhn Algorithm**. This app provides a modern, user-friendly interface for securely verifying card details.

---

## Features

- 🔒 **Secure Validation**: Validate credit card numbers using the industry-standard Luhn checksum algorithm.
- 🎨 **Modern Design**: Clean and intuitive UI built with **Vite** and **Tailwind CSS**.
- ⚡ **Performance-Optimized**: Lightweight and fast, thanks to Vite’s blazing build speed.
- 🧪 **Well-Tested**: Fully tested with **Jest** and **React Testing Library** for reliability.
- 🌐 **Axios-Integrated**: Efficient API communication with reusable Axios instances.

---

## Technologies Used

| **Technology**  | **Description**                              |
|------------------|----------------------------------------------|
| React            | Front-end framework for building the UI     |
| Vite             | Fast bundler and build tool                 |
| Tailwind CSS     | Utility-first CSS framework for styling     |
| Jest             | Testing framework for unit and integration tests |
| Axios            | Simplified HTTP requests                   |

---

## Installation

### Prerequisites

- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/exagonsoft/credit-card-validator.git
   cd credit-card-validator
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

4. **Build for Production**

   ```bash
   npm run build
   ```

5. **Run Tests**

   ```bash
   npm run test
   ```

---

## How It Works

1. Enter a **credit card number** in the input field.
2. Select the **cardholder's name** and additional details.
3. Click on **Validate**.
4. The app checks the validity of the card number using the **Luhn Algorithm** and provides instant feedback.

---

## API Integration

This application communicates with a Nest.js backend for server-side validation. The frontend sends a POST request with the credit card details.

```javascript
const response = await axios.post('/validate', {
  cardNumber: '4111111111111111',
});
console.log(response.data.valid); // true or false
```

---

## Testing

The app uses **Jest** and **React Testing Library** to ensure functionality and performance.

- Run the tests:

  ```bash
  npm run test
  ```

- View the test coverage:

  ```bash
  npm run test:cov
  ```

---

## Contributing

Contributions are welcome! Here's how you can get involved:

1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact

For questions or support, reach out to **[Alvaro Raul Martin](mailto:exagonsoft@exagon-soft.com)**.
