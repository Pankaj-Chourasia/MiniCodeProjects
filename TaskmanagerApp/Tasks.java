public class Tasks {
    private String title;
    private String description;
    private int priority;
    private String dueDate;
    private boolean status;

    public Tasks(String title, String description, int priority, String dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.status = false;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getPriority() {
        return priority;
    }

    public String getDueDate() {
        return dueDate;
    }

    public boolean isStatus() {
        return status;
    }
    public void markAsComplete(){
        this.status = true;
    }

    @Override
    public String toString(){
        return "Title: " + title + '\n' +
                "Description: " + description + '\n' +
                "Priority: " + priority + "\n" +
                "Due Date: " + dueDate + "\n" +
                "Status: " + (status ? "Completed" : "Not Completed");
    }
}
