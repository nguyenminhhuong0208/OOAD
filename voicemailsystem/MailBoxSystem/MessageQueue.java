import java.util.ArrayList;
public class MessageQueue {
    private ArrayList<Message> queue = new ArrayList<Message>();
    public MessageQueue()
    {
        this.queue = new ArrayList<Message>();
    }
    public Message remove()
    {
        return queue.remove(0);
    }
    public void add(Message newMessage)
    {
        this.queue.add(newMessage);
    }
    public int size()
    {
        return this.queue.size();
    }
    public Message peek()
    {
        if (this.queue.size() == 0)
        {
            return null;
        }
        return this.queue.get(0);
    }
}
