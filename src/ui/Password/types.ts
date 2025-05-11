export interface PasswordProps {
  lsPassword?: string
  testPassword: (password: string) => Promise<boolean>
}
