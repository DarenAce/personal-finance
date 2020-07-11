import { gql } from "@apollo/client";

export const API_URL = "http://localhost:3000/api/graphql";

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
                id
                name
                description
            }
            currency {
                id
                code
                country
                sign
            }
            owner {
                id
                firstName
                middleName
                lastName
                fullName
                birthday
                email
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
                id
                name
                description
            }
            currency {
                id
                code
                country
                sign
            }
            owner {
                id
                firstName
                middleName
                lastName
                fullName
                birthday
                email
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
                id
                bank {
                    id
                    name
                    description
                }
                currency {
                    id
                    code
                    country
                    sign
                }
                owner {
                    id
                    firstName
                    middleName
                    lastName
                    fullName
                    birthday
                    email
                }
                number
                description
            }
            owner {
                id
                firstName
                middleName
                lastName
                fullName
                birthday
                email
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
                id
                bank {
                    id
                    name
                    description
                }
                currency {
                    id
                    code
                    country
                    sign
                }
                owner {
                    id
                    firstName
                    middleName
                    lastName
                    fullName
                    birthday
                    email
                }
                number
                description
            }
            owner {
                id
                firstName
                middleName
                lastName
                fullName
                birthday
                email
            }
            number
            description
        }
    }
`;

export const ALL_WIRE_TRANSACTIONS_QUERY = gql`
    query allTransactions {
        allTransactions {
            id
            account {
                id
                bank {
                    id
                    name
                    description
                }
                currency {
                    id
                    code
                    country
                    sign
                }
                owner {
                    id
                    firstName
                    middleName
                    lastName
                    fullName
                    birthday
                    email
                }
                number
                description
            }
            card {
                id
                account {
                    id
                    bank {
                        id
                        name
                        description
                    }
                    currency {
                        id
                        code
                        country
                        sign
                    }
                    owner {
                        id
                        firstName
                        middleName
                        lastName
                        fullName
                        birthday
                        email
                    }
                    number
                    description
                }
                owner {
                    id
                    firstName
                    middleName
                    lastName
                    fullName
                    birthday
                    email
                }
                number
                description
            }
            currency {
                id
                code
                country
                sign
            }
            category {
                id
                name
                description
            }
            sum
            sumInAccountCurrency
            transactionDate
            processedDate
            description
            comment
        }
    }
`;

export const ADD_WIRE_TRANSACTION_MUTATION = gql`
    mutation createTransaction($transaction: CreateTransactionInput!) {
        createTransaction(transaction: $transaction) {
            id
            account {
                id
                bank {
                    id
                    name
                    description
                }
                currency {
                    id
                    code
                    country
                    sign
                }
                owner {
                    id
                    firstName
                    middleName
                    lastName
                    fullName
                    birthday
                    email
                }
                number
                description
            }
            card {
                id
                account {
                    id
                    bank {
                        id
                        name
                        description
                    }
                    currency {
                        id
                        code
                        country
                        sign
                    }
                    owner {
                        id
                        firstName
                        middleName
                        lastName
                        fullName
                        birthday
                        email
                    }
                    number
                    description
                }
                owner {
                    id
                    firstName
                    middleName
                    lastName
                    fullName
                    birthday
                    email
                }
                number
                description
            }
            currency {
                id
                code
                country
                sign
            }
            category {
                id
                name
                description
            }
            sum
            sumInAccountCurrency
            transactionDate
            processedDate
            description
            comment
        }
    }
`;
