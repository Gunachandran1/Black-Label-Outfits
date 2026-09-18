package com.blacklabel.ecommerce.dto.request;
import lombok.Data;
@Data
public class ReviewRequest {
    private int rating;
    private String title;
    private String comment;
}
