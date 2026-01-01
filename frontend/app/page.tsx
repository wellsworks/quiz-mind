import Container from "@/components/Container";
import Link from "next/link";

export default function Page() {
    return (
        <Container className="grid min-h-svh bg-background text-foreground">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <h1 className="text-2xl font-bold">Welcome to QuizMind!</h1>
                                <p className="text-muted-foreground text-sm text-balance">
                                    QuizMind is your personal AI-powered study assistant
                                </p>
                            <div>
                                <Link href="/register" className="underline">
                                    Sign up
                                </Link> for a free account!
                            </div>
                            <div>
                                Already have an account? 
                                <Link href="/login" className="underline"> Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </Container>
    );
}