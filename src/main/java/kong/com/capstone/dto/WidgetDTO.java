package kong.com.capstone.dto;

import java.time.LocalDate;

public class WidgetDTO {
    private Long id;
    private String name;
    private String description;
    private int amount;
    private String image;
    private String username;
    private String created;

    public WidgetDTO(Long id, String name, String description, int amount, String image, String username, String created) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.image = image;
        this.username = username;
        this.created = created;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }
}
