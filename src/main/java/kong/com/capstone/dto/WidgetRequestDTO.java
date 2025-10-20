package kong.com.capstone.dto;

public class WidgetRequestDTO {
        private String name;
        private String description;
        private int amount;
        private String image;
        private Long userId;   // send userId instead of username
        private String created; // e.g., "2025-10-20"

    public WidgetRequestDTO(String name, String description, int amount, String image, Long userId, String created) {
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.image = image;
        this.userId = userId;
        this.created = created;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }
}


