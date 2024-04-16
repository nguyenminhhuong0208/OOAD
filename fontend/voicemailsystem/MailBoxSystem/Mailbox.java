public class Mailbox {
    private String passcode;
    private String greeting;
    MessageQueue newMessages;
    MessageQueue keptMessages;
    public Mailbox(String aPasscode, String aGreeting)
    {   
        this.passcode = aPasscode;
        this.greeting = aGreeting;
        this.newMessages = new MessageQueue();
        this.keptMessages = new MessageQueue();
    }

    public boolean checkPasscode(String aPasscode)
    {
        return aPasscode.equals(this.passcode);
    }

    public void addMessage(Message aMessage)
    {
        newMessages.add(aMessage);
    }
    public Message getCurrentMessage()
    {
        if (this.newMessages.size() > 0)
        {
            return newMessages.peek();
        }
        else if (this.keptMessages.size() > 0)
        {
            return keptMessages.peek();
        }
        return null;
    }
    public Message removeCurrentMessage()
    {
        if (newMessages.size() > 0){
            return newMessages.remove();
        }
        else if (keptMessages.size() > 0){
            return keptMessages.remove();
        }
        return null;
    }
    public void saveCurrentMessage()
    {
        Message m = removeCurrentMessage();
        if (m != null){
            keptMessages.add(m);
        }
    }
    public void setGreeting(String newGreeting)
    {
        greeting = newGreeting;
    }
    public void setPasscode(String newPasscode)
    {
        this.passcode = newPasscode;
    }
    public String getGreeting()
    {
        return this.greeting;
    }
}
