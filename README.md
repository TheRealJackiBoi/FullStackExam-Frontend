# React + TypeScript + Vite

## FileStructure

```
--src
  --assets
  --components
  --pages
  --utilities
  --graphql
    mutations.ts
    queries.ts
  --types
  index.d.ts
```# RepIt

## Project Description
Our app is like Wolt, but for tech repairs. It allows users to easily find and schedule repair services for their tech devices.

## Project Prototype (Figma)
[Link to Figma Prototype](https://www.figma.com/file/LbQBCQXXkOSp0jUBOCexN6/FullStack?type=design&node-id=0%3A1&mode=design&t=CTflDUWxHEojKWO3-1)

## Project Code
- **Routes Documentation:**
```typescript
export const Mutation = {
  // CRUD FOR BOOKING
  createBooking: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], createBooking ),
  updateBooking: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], updateBooking ),
  deleteBooking: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], deleteBooking ),

  // CRUD FOR SERVICE
  createService: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN, Role.ADMIN ], createService ),
  updateService: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN, Role.ADMIN ], updateService ),
  deleteService: auth([ Role.COMPANYOWNER, Role.COMPANYADMIN, Role.ADMIN ], deleteService ),

  // CRUD FOR USER
  createUser: createUser,
  updateUser: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], updateUser ),
  deleteUser: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], deleteUser ),

  // CRUD FOR ADDRESS
  createAddress: createAddress,
  updateAddress: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], updateAddress ),
  deleteAddress: auth([ Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER ], deleteAddress ),

  // CRUD FOR COMPANY
  createCompany: auth([ Role.USER, Role.ADMIN ], createCompany ),
  updateCompany: auth([ Role.COMPANYOWNER, Role.ADMIN, Role.COMPANYADMIN ], updateCompany ),
  deleteCompany: auth([ Role.COMPANYOWNER, Role.ADMIN ], deleteCompany ),
  deleteCompanyAdmin: auth([ Role.ADMIN, Role.COMPANYOWNER ], deleteCompanyAdmin ),
  createCompanyAdmin: auth([ Role.ADMIN, Role.COMPANYOWNER ], createCompanyAdmin )
};

export const Query = {
  hello: () => "Hello World",
  bookings: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], bookings),
  booking: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], booking),
  bookingsByUser: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], bookingsByUser),
  services: services,
  service: service,
  users: auth([Role.ADMIN], users),
  user: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], user),
  login: login,
  addresses: auth([Role.ADMIN], addresses),
  address: auth([Role.USER, Role.ADMIN, Role.COMPANYADMIN, Role.COMPANYOWNER], address),
  companies: companies,
  company: company,
  searchCompanies: searchCompanies,
};

export const auth = (roles: Role[], resolver: any) => {
  return async (parent: any, args: any, context: any, info: any) => {
    const { Users } = context.dataSources;
    const { token } = args;

    if (!token) {
      throw new GraphQLError("Not authenticated");
    }

    const { role: userRole, id } = jwt.decode(token) as {
      role: Role;
      id: string;
    };
    if (!(await Users.findById(id))) {
      throw new GraphQLError("User not found");
    }
    if (!roles.includes(userRole)) {
      throw new GraphQLError("Not authorized");
    }

    return await resolver(parent, args, context, info);
  };
};
```

## Project Repository Link
[Link to frontend Project Repository](https://github.com/TheRealJackiBoi/FullStackExam-Frontend)
[Link to backend Project Repository](https://github.com/TheRealJackiBoi/FullStackExam-Backend)

## Project Team Members
- Anders Hein Larsen
- Jack Oulund
- Julius Hvid Lassen


## FileStructure

```
--src
  --assets
  --components
  --pages
  --utilities
  --graphql
    mutations.ts
    queries.ts
  --types
  index.d.ts
```