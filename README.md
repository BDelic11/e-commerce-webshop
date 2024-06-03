Hello everyone!

WHAT IS IT ABOUT?
This is my latest project i have been working on. I used newest technologies to help me develop this web aplication of a web shop. I have made this application for 
my final work on a 3rd year on FESB Croatia Faculty and also wanted to show my latest development skills. I first time used Prisma database with Supabase and
newest Server Actions on a project and i liked its implementation. I integrated it with Next.js, framework based on React and shadcn for some basic UI components.
I also used Custom Design of this project that i came up with in figma and think it suits the project.

PROJECT DETAILS:
Project is implementation of webshop, both with Client and Admin side. On client there are basic webshop functionalities like list of products, filter, loading 
skeleton animations. There is also flow from clicking on a product that redirects you to dynamic product page with product image and info. Then a Add to cart 
functionality with toaster for confirmation. Cart then gets filled with product cards and has delete option on those cards and Buy now button. Which is then 
simplified for the faculty reason and do not have payment process but just a field in database called 'Wallet' that i use for compleating the purchase.

I implemented: AUTHENTIFICATION AND AUTHORIZATION with both auth.js and middleware combined that helped me restrict users depending on their role, Zod is used 
for VALIDATION on both backend and frontend, also error handling was done for everything.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
