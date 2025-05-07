# Next.js Clerk Authentication Project
![image](https://github.com/user-attachments/assets/fc775c93-4218-493d-ba69-c086a661d7ad)

This project demonstrates a modern authentication system using Clerk with Next.js, featuring a custom profile management system.

## Features

- 🔐 Secure authentication with Clerk
- 👤 Custom profile management
- ✉️ Email verification
- 🔄 Password management
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

- Node.js 18+ installed
- A Clerk account (sign up at [clerk.com](https://clerk.com))
- npm or yarn package manager

## Environment Setup

1. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Clerk Dashboard Configuration

1. **Enable Email Verification**:
   - Go to your Clerk Dashboard
   - Navigate to "Email & SMS" → "Email"
   - Enable "Email verification"
   - Configure your email templates

2. **Configure User Profile**:
   - Go to "User & Authentication" → "User Profile"
   - Enable "First name" and "Last name" fields
   - Set them as required fields
   - Enable "Email verification required"

3. **Security Settings**:
   - Go to "Security" → "Password"
   - Enable "Password requirements"
   - Set minimum password length to 8 characters
   - Enable "Password history" (recommended)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd next-clerk
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── profile/        # Custom profile management
│   ├── dashboard/      # Protected dashboard page
│   ├── sign-in/        # Sign in page
│   └── sign-up/        # Sign up page
├── components/         # Reusable components
└── lib/               # Utility functions
```

## Profile Management Features

The custom profile page (`/profile`) includes:

- First name and last name editing
- Email display (non-editable)
- Password change functionality
- Profile picture display
- Account information display

## Security Features

- Email verification required for new accounts
- Password change with current password verification
- Minimum password length requirement
- Secure session management
- Protected routes

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

This project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support with Clerk, visit their [documentation](https://clerk.com/docs) or [community forum](https://clerk.com/community).

For project-specific issues, please open an issue in the repository.
