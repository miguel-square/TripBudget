# Overview

An app for a group of people that plans a trip, event or general get-together and need to keep track of the expenses each of the individuals makes, the ida is to make clear who owns what to whom at the end.

## Problem Definition

When a group of friends or family prepare a trip or an event together, is hard to keep track manually of the expenses. The idea is to have a record for every expense, who made it, when, and who else is involve in it, and make a final tally of all the individual debts.

## Priorities

### Must have

- An Admin must be able to create an "Event". 
- A User must be able to sign-in to a specific Event.
- A User must be able to sign-up and login.
- A User must be able to add a Expenditure with name, date, value and a link to involved Users 
- A user must be able to see a tally of each debt status with another user.
- A User must be able to mark a debt as settled (open to revision).

### Should have

- A User should have the ability to see previous Events.
- An Admin should be able to mark the expenditures with status, specially "disputed". 
- A User should be able to edit a Expenditure.

### Could have

- A User could see a summary of all his tabs with the rest of the users.
- A user could select an icon or emoji to mark a expenditure.
- An Event could have a type (e.g. Trip, Diner)
- A User could be able to create a templated repeated expense.
- A User could select a date within a limited range.
- A User could split an Expenditure in different percentages each of the involved party.
- An Expenditure could have a specific currency.

### Will not have

- Connection with payment platforms
- Messaging tool for the users.


## Domain Model

```mermaid
erDiagram
    EXPENSE ||..o{ CURRENCY : "has"
    EVENT ||..o{ TYPE : "has"
    EVENT o{--|| EXPENSE : has
    EXPENSE ||--o{ USEREXPENSE : has
    USEREXPENSE }|--|{ USER : "is in"
    EVENT ||--o{ EVENTUSER : has
    EVENTUSER }|--|{ USER : "is in"  
```

### Entity Relationship Diagram

```mermaid
erDiagram
    USER {
        int id PK
        text username
        text email
        text first_name
        text second_name
        text password
    }
    EVENT {
        int id PK
        text name
        date start_date
        date end_date
        int type_id FK       
    }
    EXPENSE {
        int id PK
        text description
        float value
        timestamp date
        int currency_id FK
        int event_id FK
    }
    TYPE {
        int id PK
        text name
    }
    CURRENCY {
        int id PK
        text name
        text prefix
    }
    USEREXPENSE {
        int id PK
        int user_id FK
        int expense_id FK
        bool is_owner
        float ratio
        bool paid
    }
    EVENTUSER {
        int id PK
        int user_id FK
        int trip_id FK
        bool is_admin
    }
    EXPENSE ||..o{ CURRENCY : "has"
    EVENT ||..o{ TYPE : "has"
    EVENT o{--|| EXPENSE : has
    EXPENSE ||--o{ USEREXPENSE : has
    USEREXPENSE }|--|{ USER : "is in"
    EVENT ||--o{ EVENTUSER : has
    EVENTUSER }|--|{ USER : "is in"    
```
