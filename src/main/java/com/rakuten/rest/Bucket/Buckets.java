package com.rakuten.rest.Bucket;

public enum Buckets {
    
    PROFILE_IMAGE("rakutech-spring-aws-bucket");

    private final String bucket;

    private Buckets(String bucket) {
        this.bucket = bucket;
    }

    public String getBucket() {
        return bucket;
    }
    
    
}
