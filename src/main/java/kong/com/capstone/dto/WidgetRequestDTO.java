package kong.com.capstone.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WidgetRequestDTO {
    private String name;
    private String description;
    private int amount;
    private String image;

    @JsonProperty("userId")
    private String userIdStr;

    private String created;

    public WidgetRequestDTO() {}

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
        return userIdStr != null && !userIdStr.isEmpty() ? Long.parseLong(userIdStr) : null;
    }

    public void setUserIdStr(String userId) {
        this.userIdStr = userId;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }
}