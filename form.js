// Importar o módulo MySQL
const mysql = require("mysql");

// Modelo de dados Client
const Client = {
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
};

// Criar uma conexão com o banco de dados
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_database",
});

// Validação de campos obrigatórios
function validateForm() {
  const firstName = document.getElementById("firstname");
  const lastName = document.getElementById("lastname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "" || confirmPassword.value === "") {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return false;
  }

  // Validação de e-mail
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email.value)) {
    alert("O endereço de e-mail é inválido.");
    return false;
  }

  // Validação de dados do banco de dados
  const query = `SELECT * FROM clients WHERE email = '${email.value}'`;
  connection.query(query, (err, results) => {
    if (err) {
      throw err;
    }

    if (results.length > 0) {
      alert("O endereço de e-mail já está em uso.");
      return false;
    }
  });

  // Armazene os dados do formulário no banco de dados
  const firstName = document.getElementById("firstname").value;
  const lastName = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;

  const query = `INSERT INTO clients (firstName, lastName, email) VALUES ('${firstName}', '${lastName}', '${email}')`;
  connection.query(query, (err, results) => {
    if (err) {
      throw err;
    }

    alert("Formulário enviado com sucesso!");
  });

  return true;
}

// Prevenção de envio do formulário se houver erros
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});

router.post("/api/clients", async (req, res) => {
    // Obter os dados do formulário
    const { firstName, lastName, email } = req.body;
  
    // Criar um novo objeto do modelo de dados
    const client = new Client({
      id: null,
      firstName,
      lastName,
      email,
    });
  
    // Inserir o cliente no banco de dados
    await connection.query("INSERT INTO clients (firstName, lastName, email) VALUES (?, ?, ?)", [
      client.firstName,
      client.lastName,
      client.email,
    ]);
  
    // Retornar o cliente
    res.json(client);
  });
  