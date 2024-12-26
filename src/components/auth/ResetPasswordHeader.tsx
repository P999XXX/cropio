interface ResetPasswordHeaderProps {
  firstName?: string;
  isMobile: boolean;
}

const ResetPasswordHeader = ({ firstName, isMobile }: ResetPasswordHeaderProps) => {
  return (
    <div className={`space-y-2 ${isMobile ? 'text-left' : 'text-center'} mb-6`}>
      <h1 className="text-2xl md:text-3xl font-bold">
        {firstName ? `Hello ${firstName}!` : "Reset Password"}
      </h1>
      <p className="text-muted-foreground">Create a new password for your account</p>
    </div>
  );
};

export default ResetPasswordHeader;