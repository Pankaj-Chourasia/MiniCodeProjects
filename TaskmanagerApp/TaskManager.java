import java.util.Scanner;

public class TaskManager {
    private final Scanner scanner;
    private final Tasks[] tasks;
    private int taskCount;

    public TaskManager() {
        scanner = new Scanner(System.in);
        tasks = new Tasks[100]; //Assuming maximum of 100 tasks
        taskCount = 0;
    }

    public void displayMenu() {
        int choice;
        do {
            System.out.println("Menu:");
            System.out.println("1. Add Task");
            System.out.println("2. Edit Task");
            System.out.println("3. Delete Task");
            System.out.println("4. View Tasks");
            System.out.println("5. Mark as Complete.");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine();
            switch (choice) {
                case 1:
                    addTask();
                    break;
                case 2:
                    editTask();
                    break;
                case 3:
                    deleteTask();
                    break;
                case 4:
                    viewTask();
                    break;
                case 5:
                    markTaskAsComplete();
                    break;
                case 6:
                    System.out.println("Exiting ....");
                    break;
                default:
                    System.out.println("Invalid choice . Try again.");
            }
        } while (choice != 6);
    }

    private void addTask() {
        System.out.println("Enter the title of task: ");
        String title = scanner.nextLine();
        System.out.print("Enter task description: ");
        String description = scanner.nextLine();
        System.out.print("Enter task priority (1: Low, 2: Medium, 3: High): ");
        int priority = scanner.nextInt();
        scanner.nextLine();
        System.out.print("Enter task due date (YYYY-MM-DD): ");
        String dueDate = scanner.nextLine();

        tasks[taskCount] = new Tasks(title, description, priority, dueDate);
        taskCount++;
        System.out.println("Task added successfully.");
    }

    private void editTask() {
        //Display present tasks
        System.out.println("Present Tasks: ");
        for (int i = 0; i < taskCount; i++) System.out.println((i + 1) + ". " + tasks[i].getTitle());

        System.out.println("Enter the number corresponding to the task you want to edit: ");
        int taskNumber = scanner.nextInt();
        scanner.nextLine();

        if (taskNumber < 1 || taskNumber > taskCount)
            System.out.println("Invalid task number. Please try again with open eyes.");

        int taskIndex = taskNumber - 1;

        System.out.println("Select the detail you want to edit: ");
        System.out.println("1. Title");
        System.out.println("2. Description");
        System.out.println("3. Priority");
        System.out.println("4. Due Date");
        System.out.println("Enter your choice: ");

        int editChoice = scanner.nextInt();
        scanner.nextLine();

        switch (editChoice) {
            case 1:
                System.out.println("Enter new title: ");
                String newTitle = scanner.nextLine();
                tasks[taskIndex].setTitle(newTitle);
                break;
            case 2:
                System.out.println("Enter new Description: ");
                String newDescription = scanner.nextLine();
                tasks[taskIndex].setDescription(newDescription);
                break;
            case 3:
                System.out.println("Enter new priority: (1: Low, 2: Medium, 3: High");
                int newPriority = scanner.nextInt();
                tasks[taskIndex].setPriority(newPriority);
                break;
            case 4:
                System.out.print("Enter new due date (YYYY-MM-DD): ");
                String newDueDate = scanner.nextLine();
                tasks[taskIndex].setDueDate(newDueDate);
                break;
            default:
                System.out.println("Invalid choice. No changes made.");
        }
        System.out.println("Task edited successfully.");
    }

    private void deleteTask() {
        System.out.println("Present Tasks: ");
        for (int i = 0; i < taskCount; i++) System.out.println((i + 1) + ". " + tasks[i].getTitle());

        System.out.println("Enter the number corresponding to the task you want to edit: ");
        int taskNumber = scanner.nextInt();
        scanner.nextLine();

        if (taskNumber < 1 || taskNumber > taskCount)
            System.out.println("Invalid task number. Please try again with open eyes.");

        int taskIndex = taskNumber - 1;

        for (int i = taskIndex; i < taskCount - 1; i++) tasks[i] = tasks[i + 1];

        taskCount--;

        //Set the last element to null to release the reference
        tasks[taskCount] = null;
        System.out.println("Task deleted successfully.");
    }

    public void viewTask() {
        System.out.println("Present Tasks: ");
        for (int i = 0; i < taskCount; i++) System.out.println((i + 1) + ". " + tasks[i].toString());
    }

    public void markTaskAsComplete() {
        System.out.println("Present Tasks: ");
        for (int i = 0; i < taskCount; i++)
            System.out.println((i + 1) + ". " + tasks[i].getTitle());

        System.out.println("Enter the number corresponding to the task you want to mark as complete: ");
        int taskNumber = scanner.nextInt();
        scanner.nextLine();

        if (taskNumber < 1 || taskNumber > taskCount)
            System.out.println("Invalid task number. Please try again.");

        int taskIndex = taskNumber - 1;

        tasks[taskIndex].markAsComplete();
        System.out.println("Task marked as complete: ");
        System.out.println(tasks[taskIndex].toString());
    }

    public static void main(String[] args) {
        TaskManager taskManager = new TaskManager();
        taskManager.displayMenu();
    }
}
