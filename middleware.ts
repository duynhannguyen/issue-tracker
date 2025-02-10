import withAuth from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/issues/:path*"],
};

export default withAuth({
  pages: {
    signIn: "/",
    newUser: "/dashboard/groups",
  },
});
