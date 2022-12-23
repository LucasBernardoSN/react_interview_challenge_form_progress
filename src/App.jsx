/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useState } from "react";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const REGISTER_FORM_INITIAL_STATE = {
  full_name: {
    value: "",
    isValid: false,
  },
  email: {
    value: "",
    isValid: false,
  },
  civil_status: {
    value: "",
    isValid: false,
  },
  gender: {
    value: "",
    isValid: false,
  },
};

function App() {
  const [registerFormData, setRegisterFormData] = useState(
    REGISTER_FORM_INITIAL_STATE
  );

  const isAllFieldsValid = Object.values(registerFormData).every(
    (field) => field.isValid
  );

  const getRegisterFormProgress = () => {
    const totalFields = Object.keys(registerFormData).length;
    const totalValidFields = Object.values(registerFormData).filter(
      (field) => field.isValid
    ).length;
    if (totalFields === 0) return 0;
    const progress = (totalValidFields / totalFields) * 100;
    return progress;
  };

  /**
   * Validação baseada em nomes comumente usados em português.
   * - Válido se houver no mínimo dois nomes.
   * - Concidera nomes diferentes quando houver espaços entre eles.
   * @param {string} fullName
   */
  const validateFullName = (fullName) => {
    const fullNameSplite = fullName.split(" ");
    const isMoreThanOneName = fullNameSplite.length >= 2;
    return isMoreThanOneName;
  };

  const validateEmail = (email) => {
    const isValid = EMAIL_REGEX.test(String(email).toLowerCase());
    return isValid;
  };

  const validadeIsNotEmpty = (value) => {
    return value !== "";
  };

  const handleChangeInput = (value, inputName, validateFunction) => {
    const isValid = validateFunction(value);

    setRegisterFormData((prevState) => ({
      ...prevState,
      [inputName]: {
        value,
        isValid,
      },
    }));
  };

  const handleChangeFullName = (event) => {
    handleChangeInput(event.target.value, "full_name", validateFullName);
  };

  const handleChangeEmail = (event) => {
    handleChangeInput(event.target.value, "email", validateEmail);
  };

  const handleChangeCivilStatus = (event) => {
    handleChangeInput(event.target.value, "civil_status", validadeIsNotEmpty);
  };

  const handleChangeGender = (value) => {
    handleChangeInput(value, "gender", validadeIsNotEmpty);
  };

  const handleSubmit = () => {
    alert("Formulário enviado com sucesso!");
    setRegisterFormData(REGISTER_FORM_INITIAL_STATE);
  };

  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div
            className="bar"
            style={{ width: `${getRegisterFormProgress()}%` }}
          ></div>
        </div>
        <div className="form-group">
          <label htmlFor="full_name">Nome Completo</label>
          <input
            id="full_name"
            name="full_name"
            onChange={handleChangeFullName}
            value={registerFormData.full_name.value}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            onChange={handleChangeEmail}
            value={registerFormData.email.value}
          />
        </div>
        <div className="form-group">
          <label htmlFor="civil_status">Estado Civil</label>
          <select
            id="civil_status"
            name="civil_status"
            onChange={handleChangeCivilStatus}
            value={registerFormData.civil_status.value}
          >
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                type="radio"
                id="gender"
                name="gender"
                onChange={() => handleChangeGender("masculino")}
                checked={registerFormData.gender.value === "masculino"}
              />
              Masculino
            </span>
            <span>
              <input
                type="radio"
                id="gender"
                name="gender"
                onChange={() => handleChangeGender("feminino")}
                checked={registerFormData.gender.value === "feminino"}
              />
              Feminino
            </span>
          </div>
        </div>
        <button onClick={handleSubmit} disabled={!isAllFieldsValid}>
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
