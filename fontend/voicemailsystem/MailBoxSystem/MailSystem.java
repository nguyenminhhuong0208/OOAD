import java.util.ArrayList;

public class MailSystem {
    private ArrayList<Mailbox> mailboxes;
    public MailSystem(int mailboxCount)
    {
        mailboxes = new ArrayList<>();
    // Initialize mailboxes.
        for (int i = 0; i < mailboxCount; i++)
        {
            String passcode = "" + (i + 1);
            String greeting = "You have reached mailbox " + (i + 1)
            + ". \nPlease leave a message now.";
            mailboxes.add(new Mailbox(passcode, greeting));
        }
    }  
    public Mailbox findMailbox(String ext)
    {
        int i = Integer.parseInt(ext);
        if (1 <= i && i <= mailboxes.size())
        {
            return mailboxes.get(i - 1);
        }
        else {return null;}
    }


}
