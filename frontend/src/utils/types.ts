import { ComponentType } from "react";

export interface Route {
    name: string;
    path: string;
    displayName: string;
    component: ComponentType<any>;
}

export interface Person {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fullName: string;
    birthday: Date;
    email: string;
}

export interface PersonQuery {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fullName: string;
    birthday: Date;
    email: string;
}

export interface PersonsQueryResult {
    allPersons: PersonQuery[];
}

export interface NewPersonDetails {
    firstName: string;
    middleName: string;
    lastName: string;
    birthday: Date;
    email: string;
}

export interface Currency {
    id: string;
    code: string;
    country: string;
    sign: string;
}

export interface CurrencyQuery {
    id: string;
    code: string;
    country: string;
    sign: string;
}

export interface CurrenciesQueryResult {
    allCurrencies: Currency[];
}

export interface NewCurrencyDetails {
    code: string;
    country: string;
    sign: string;
}

export interface Bank {
    id: string;
    name: string;
    description: string;
}

export interface BankQuery {
    id: string;
    name: string;
    description: string;
}

export interface BanksQueryResult {
    allBanks: BankQuery[];
}

export interface NewBankDetails {
    name: string;
    description: string;
}

export interface Account {
    id: string;
    bank: Bank;
    currency: Currency;
    owner: Person;
    number: string;
    description: string;
}

export interface AccountQuery {
    id: string;
    bank: {
        name: string;
    };
    currency: {
        code: string;
        sign: string;
    };
    owner: {
        fullName: string;
    };
    number: string;
    description: string;
}

export interface AccountsQueryResult {
    allAccounts: Account[];
}

export interface NewAccountDetails {
    bank: string;
    currency: string;
    owner: string;
    number: string;
    description: string;
}

export interface Card {
    id: string;
    account: Account;
    owner: Person;
    number: string;
    description: string;
}

export interface CardQuery {
    id: string;
    account: {
        bank: {
            name: string;
        };
        currency: {
            code: string;
            sign: string;
        };
        owner: {
            fullName: string;
        };
        number: string;
        description: string;
    };
    owner: {
        fullname: string;
    };
    number: string;
    description: string;
}

export interface CardsQueryResult {
    allCards: Card[];
}

export interface NewCardDetails {
    account: string;
    owner: string;
    number: string;
    description: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface CategoryQuery {
    id: string;
    name: string;
    description: string;
}

export interface CategoriesQueryResult {
    allCategories: CategoryQuery[];
}

export interface NewCategoryDetails {
    name: string;
    description: string;
}

export interface Transaction {
    id: string;
    account: Account;
    card: Card | null;
    currency: Currency;
    category: Category;
    sum: number;
    sumInAccountCurrency: number;
    transactionDate: Date;
    processedDate: Date;
    description: string;
    comment: string;
}

export interface TransactionQuery {
    id: string;
    account: {
        bank: {
            name: string;
        };
        description: string;
    };
    card: { description: string } | null;
    currency: Currency;
    category: Category;
    sum: number;
    transactionDate: Date;
    description: string;
    comment: string;
}

export interface TransactionsQueryResult {
    allTransactions: TransactionQuery[];
}

export interface NewTransactionDetails {
    account: string;
    card: string | null;
    currency: string;
    category: string;
    sum: number;
    sumInAccountCurrency: number;
    transactionDate: Date;
    processedDate: Date;
    description: string;
    comment: string;
}
