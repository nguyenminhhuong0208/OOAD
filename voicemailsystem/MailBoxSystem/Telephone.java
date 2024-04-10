import java.util.Scanner;

public class Telephone {
    private Scanner scanner;
    public Telephone(Scanner aScanner)
    {
        this.scanner = aScanner;
    }
    public void speak(String output)
    {
        System.out.println(output);
    }
    public void run(Connection c)
    {
        boolean more = true;
        while (more)
        {
            String input = scanner.nextLine();
            if (input == null)
            {
                return;
            }
            if (input.equalsIgnoreCase("H"))
            {
                c.hangup();
            }
            else if (input.length() == 1 && "1234567890#".indexOf(input)  >= 0)
            {
                c.dial(input);
            }
            else{
                c.record(input);
            }
        }
    }
}
