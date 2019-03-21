package com.triana.salesianos.supermerkapp2.activities;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.fragments.MarketFragment;
import com.triana.salesianos.supermerkapp2.models.CategoryResponse;

public class MarketActivity extends AppCompatActivity {

    CategoryResponse categoriaId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        Bundle extras = getIntent().getExtras();
        categoriaId = (CategoryResponse) extras.getSerializable("categoriaId");

        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.contenedor, new MarketFragment(categoriaId))
                .commit();

    }

}
