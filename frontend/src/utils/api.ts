import { gql } from "apollo-boost";
import { Transaction } from "./types";

export const API_URL = "http://localhost:3000/api/graphql";

export const getTransactions = (): Transaction[] => [
    {
        id: "1",
        account: {
            id: "1",
            bank: {
                id: "1",
                name: "Best Bank",
                description: "The test bank #1.",
            },
            currency: {
                id: "1",
                code: "USD",
                country: "US",
                sign: "$",
            },
            owner: {
                id: "1",
                firstName: "John",
                middleName: "Nobody",
                lastName: "Doe",
                fullName: "John Doe",
                birthday: new Date("1973-06-29"),
                email: "jonh.doe@email.com",
            },
            number: "0123 456 78901234 56789",
            description: "The test account #1 of John Doe.",
        },
        card: {
            id: "1",
            account: {
                id: "1",
                bank: {
                    id: "1",
                    name: "Best Bank",
                    description: "The test bank #1.",
                },
                currency: {
                    id: "1",
                    code: "USD",
                    country: "US",
                    sign: "$",
                },
                owner: {
                    id: "1",
                    firstName: "John",
                    middleName: "Nobody",
                    lastName: "Doe",
                    fullName: "John Doe",
                    birthday: new Date("1973-06-29"),
                    email: "jonh.doe@email.com",
                },
                number: "0123 456 78901234 56789",
                description: "The test account #1 of John Doe.",
            },
            owner: {
                id: "1",
                firstName: "John",
                middleName: "Nobody",
                lastName: "Doe",
                fullName: "John Doe",
                birthday: new Date("1973-06-29"),
                email: "jonh.doe@email.com",
            },
            number: "0123 4567 8901 2345",
            description: "The test card #1 of John Doe.",
        },
        currency: {
            id: "1",
            code: "USD",
            country: "US",
            sign: "$",
        },
        category: {
            id: "1",
            name: "Test category #1",
            description: "This category is just for the test purposes only.",
        },
        sum: 17.0,
        sumInAccountCurrency: 17.0,
        transactionDate: new Date("2020-03-18T15:13:42"),
        processedDate: new Date("2020-03-23T00:18:01"),
        description: "Test transaction #1 of John Doe",
        comment: "This transaction is just for the test purposes only.",
    },
    {
        id: "2",
        account: {
            id: "2",
            bank: {
                id: "1",
                name: "Best Bank Ever",
                description: "The test bank #2.",
            },
            currency: {
                id: "2",
                code: "EUR",
                country: "EU",
                sign: "€",
            },
            owner: {
                id: "1",
                firstName: "John",
                middleName: "Nobody",
                lastName: "Doe",
                fullName: "John Doe",
                birthday: new Date("1973-06-29"),
                email: "jonh.doe@email.com",
            },
            number: "9876 543 21098765 43210",
            description: "The test account #2 of John Doe.",
        },
        card: null,
        currency: {
            id: "2",
            code: "EUR",
            country: "EU",
            sign: "€",
        },
        category: {
            id: "2",
            name: "Test category #2",
            description: "This category is just for the test purposes only.",
        },
        sum: 42.0,
        sumInAccountCurrency: 42.0,
        transactionDate: new Date("2020-03-23T17:11:08"),
        processedDate: new Date("2020-03-26T03:00:16"),
        description: "Test transaction #2 of John Doe",
        comment: "This transaction is just for the test purposes only.",
    },
    {
        id: "3",
        account: {
            id: "3",
            bank: {
                id: "1",
                name: "Best Bank",
                description: "The test bank #1.",
            },
            currency: {
                id: "1",
                code: "USD",
                country: "US",
                sign: "$",
            },
            owner: {
                id: "2",
                firstName: "Jane",
                middleName: "Nobody",
                lastName: "Doe",
                fullName: "Jane Doe",
                birthday: new Date("1976-11-08"),
                email: "jane.doe@email.com",
            },
            number: "5678 901 23456789 01234",
            description: "The test account #1 of Jane Doe.",
        },
        card: {
            id: "3",
            account: {
                id: "3",
                bank: {
                    id: "1",
                    name: "Best Bank",
                    description: "The test bank #1.",
                },
                currency: {
                    id: "1",
                    code: "USD",
                    country: "US",
                    sign: "$",
                },
                owner: {
                    id: "2",
                    firstName: "Jane",
                    middleName: "Nobody",
                    lastName: "Doe",
                    fullName: "Jane Doe",
                    birthday: new Date("1976-11-08"),
                    email: "jane.doe@email.com",
                },
                number: "5678 901 23456789 01234",
                description: "The test account #1 of Jane Doe.",
            },
            owner: {
                id: "2",
                firstName: "Jane",
                middleName: "Nobody",
                lastName: "Doe",
                fullName: "Jane Doe",
                birthday: new Date("1976-11-08"),
                email: "jane.doe@email.com",
            },
            number: "4567 8901 2345 6789",
            description: "The test card #1 of Jane Doe.",
        },
        currency: {
            id: "1",
            code: "USD",
            country: "US",
            sign: "$",
        },
        category: {
            id: "1",
            name: "Test category #1",
            description: "This category is just for the test purposes only.",
        },
        sum: 654.12,
        sumInAccountCurrency: 654.12,
        transactionDate: new Date("2020-03-01T09:57:09"),
        processedDate: new Date("2020-03-04T14:38:35"),
        description: "Test transaction #1 of Jane Doe",
        comment: "This transaction is just for the test purposes only.",
    },
];

export const ALL_PERSONS_QUERY = gql`
    query allPersons {
        allPersons {
            id
            firstName
            middleName
            lastName
            fullName
            birthday
            email
        }
    }
`;

export const ADD_PERSON_MUTATION = gql`
    mutation createPerson($person: CreatePersonInput!) {
        createPerson(person: $person) {
            id
            firstName
            middleName
            lastName
            fullName
            birthday
            email
        }
    }
`;

export const ALL_CURRENCIES_QUERY = gql`
    query allCurrencies {
        allCurrencies {
            id
            code
            country
            sign
        }
    }
`;

export const ADD_CURRENCY_MUTATION = gql`
    mutation createCurrency($currency: CreateCurrencyInput!) {
        createCurrency(currency: $currency) {
            id
            code
            country
            sign
        }
    }
`;

export const ALL_BANKS_QUERY = gql`
    query allBanks {
        allBanks {
            id
            name
            description
        }
    }
`;

export const ADD_BANK_MUTATION = gql`
    mutation createBank($bank: CreateBankInput!) {
        createBank(bank: $bank) {
            id
            name
            description
        }
    }
`;

export const ALL_ACCOUNTS_QUERY = gql`
    query allAccounts {
        allAccounts {
            id
            bank {
                name
            }
            currency {
                sign
            }
            owner {
                fullName
            }
            number
            description
        }
    }
`;

export const ADD_ACCOUNT_MUTATION = gql`
    mutation createAccount($account: CreateAccountInput!) {
        createAccount(account: $account) {
            id
            bank {
                name
            }
            currency {
                sign
            }
            owner {
                fullName
            }
            number
            description
        }
    }
`;

export const ALL_CARDS_QUERY = gql`
    query allCards {
        allCards {
            id
            account {
                number
                description
            }
            owner {
                fullName
            }
            number
            description
        }
    }
`;

export const ADD_CARD_MUTATION = gql`
    mutation createCard($card: CreateCardInput!) {
        createCard(card: $card) {
            id
            account {
                number
            }
            owner {
                fullName
            }
            number
            description
        }
    }
`;

export const ALL_CATEGORIES_QUERY = gql`
    query allCategories {
        allCategories {
            id
            name
            description
        }
    }
`;

export const ADD_CATEGORY_MUTATION = gql`
    mutation createCategory($category: CreateCategoryInput!) {
        createCategory(category: $category) {
            id
            name
            description
        }
    }
`;

export const ALL_TRANSACTIONS_QUERY = gql`
    query allTransactions {
        allTransactions {
            id
            account {
                bank {
                    name
                }
                description
            }
            card {
                description
            }
            category {
                name
            }
            sum
            transactionDate
            description
            comment
        }
    }
`;

export const ADD_TRANSACTION_MUTATION = gql`
    mutation createTransaction($transaction: CreateTransactionInput!) {
        createTransaction(transaction: $transaction) {
            id
            account {
                bank {
                    name
                }
                description
            }
            card {
                description
            }
            category {
                name
            }
            sum
            transactionDate
            description
            comment
        }
    }
`;
