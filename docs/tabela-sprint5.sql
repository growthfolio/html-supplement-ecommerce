CREATE TABLE Cliente (
    CPF VARCHAR(11) PRIMARY KEY,
    email VARCHAR(80),
    nome VARCHAR(80),
    telefone VARCHAR(12)
);

CREATE TABLE Pedido (
    id_pedido INT PRIMARY KEY,
    valor_final DECIMAL(10, 2),
    data_entrega DATE
);

CREATE TABLE Produto (
    id_produto INT PRIMARY KEY,
    nome VARCHAR(100),
    preco DECIMAL(10, 2)
);

CREATE TABLE Administrador (
    id_admin INT PRIMARY KEY,
    nome VARCHAR(80)
);

CREATE TABLE ItemPedido (
    id_item INT PRIMARY KEY,
    id_pedido INT,
    id_produto INT,
    FOREIGN KEY (id_pedido) REFERENCES Pedido (id_pedido),
    FOREIGN KEY (id_produto) REFERENCES Produto (id_produto)
);

CREATE TABLE Realiza (
    id_realiza INT PRIMARY KEY,
    id_pedido INT,
    CPF VARCHAR(11),
    FOREIGN KEY (id_pedido) REFERENCES Pedido (id_pedido),
    FOREIGN KEY (CPF) REFERENCES Cliente (CPF)
);

CREATE TABLE Compra (
    id_compra INT PRIMARY KEY,
    id_produto INT,
    CPF VARCHAR(11),
    FOREIGN KEY (id_produto) REFERENCES Produto (id_produto),
    FOREIGN KEY (CPF) REFERENCES Cliente (CPF)
);

CREATE TABLE GerenciaCliente (
    id_gerencia_cliente INT PRIMARY KEY,
    CPF VARCHAR(11),
    id_admin INT,
    FOREIGN KEY (CPF) REFERENCES Cliente (CPF),
    FOREIGN KEY (id_admin) REFERENCES Administrador (id_admin)
);

CREATE TABLE GerenciaProduto (
    id_gerencia_produto INT PRIMARY KEY,
    id_admin INT,
    id_pedido INT,
    FOREIGN KEY (id_admin) REFERENCES Administrador (id_admin),
    FOREIGN KEY (id_pedido) REFERENCES Pedido (id_pedido)
);

CREATE TABLE Atualiza (
    id_atualiza INT PRIMARY KEY,
    id_admin INT,
    id_produto INT,
    FOREIGN KEY (id_admin) REFERENCES Administrador (id_admin),
    FOREIGN KEY (id_produto) REFERENCES Produto (id_produto)
);


--Inserir dados dos Clientes:

INSERT INTO Cliente (CPF, email, nome, telefone)
VALUES 
    ('41245678999', 'felipe1teste@gmail.com', 'Felipe A.J. Macedo', '11954375533'),
    ('41245678988', 'roberto15@globo.com.br', 'Roberto Prado ', '11954374121'),
    ('41245678989', 'catarina@hotmail.com', 'Catarina J Santos', '11954379191');


-- Pesquisar Clientes por CPF ou E-mail: 
SELECT * FROM Cliente WHERE CPF = '41245678989' OR email = 'catarina@hotmail.com';
