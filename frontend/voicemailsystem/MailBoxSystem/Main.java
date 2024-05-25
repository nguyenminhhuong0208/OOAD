import java.util.Scanner;

public class Main {
    private static final int MAILBOX_COUNT = 20;
    public static void main(String[] args)
    {
        MailSystem system = new MailSystem(MAILBOX_COUNT);
        Scanner console = new Scanner(System.in);
        Telephone p = new Telephone(console);
        Connection c = new Connection(system, p);
        p.run(c);
    }
}
