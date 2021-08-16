package com.rakuten.rest.ImageStore;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;
import java.util.Optional;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageStore {
    
    private final AmazonS3 s3;

    @Autowired
    public ImageStore(AmazonS3 s3) {
        this.s3 = s3;
    }

    public void save(String path, String fileName, Optional<Map<String,String>> metadata, InputStream inputStream){
        ObjectMetadata objectMetadata = new ObjectMetadata();
        metadata.ifPresent(map -> {
            if(!map.isEmpty()){
                map.forEach(objectMetadata::addUserMetadata );
            }
        });
        try{
            s3.putObject(path,fileName,inputStream, objectMetadata);
        } catch (AmazonServiceException e){
            throw new IllegalStateException("Failed to store image", e);
        }
    }

    public byte[] getImage(String path, String key) {
        try{
            S3Object object = s3.getObject(path, key);
            S3ObjectInputStream inputStream = object.getObjectContent();
            return IOUtils.toByteArray(inputStream);
        }catch(AmazonServiceException | IOException e){
            throw new IllegalStateException("Failed to get image", e);
        }
    }

}
