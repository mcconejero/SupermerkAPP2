package com.triana.salesianos.supermerkapp2.fragments;

import android.content.Context;
import android.content.Intent;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.activities.ProductActivity;
import com.triana.salesianos.supermerkapp2.fragments.MarketFragment.OnListFragmentInteractionListener;
import com.triana.salesianos.supermerkapp2.models.CategoryResponse;
import com.triana.salesianos.supermerkapp2.models.MarketResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainer;
import com.triana.salesianos.supermerkapp2.models.ResponseContainerTwo;
import com.triana.salesianos.supermerkapp2.retrofit.generator.ServiceGenerator;
import com.triana.salesianos.supermerkapp2.retrofit.services.MarketService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MyMarketRecyclerViewAdapter extends RecyclerView.Adapter<MyMarketRecyclerViewAdapter.ViewHolder> {

    private final List<MarketResponse> mValues;
    private final OnListFragmentInteractionListener mListener;
    Context ctx;
    MarketService service;
    CategoryResponse idCat;

    public MyMarketRecyclerViewAdapter(Context context, List<MarketResponse> items, CategoryResponse id, OnListFragmentInteractionListener listener) {
        mValues = items;
        mListener = listener;
        ctx = context;
        idCat = id;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_market, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mTitle.setText(mValues.get(position).getName());

        holder.mConstraintLayout.setOnClickListener(v -> {
            System.out.println(holder.mItem.getId());
            service = ServiceGenerator.createService(MarketService.class);
            Call<ResponseContainer<MarketResponse>> callOne = service.getListMarket(holder.mItem.getId());
            callOne.enqueue(new Callback<ResponseContainer<MarketResponse>>() {

                @Override
                public void onResponse(Call<ResponseContainer<MarketResponse>> call, Response<ResponseContainer<MarketResponse>> response) {
                    Intent i = new Intent(ctx , ProductActivity.class);
                    i.putExtra("mercadoId", holder.mItem);
                    i.putExtra("categoriaId", idCat);
                    ctx.startActivity(i);
                }

                @Override
                public void onFailure(Call<ResponseContainer<MarketResponse>> call, Throwable t) {

                }
            });
        });

    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public MarketResponse mItem;
        public ConstraintLayout mConstraintLayout;
        public final TextView mTitle;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mTitle = view.findViewById(R.id.title);
            mConstraintLayout = view.findViewById(R.id.constraint2);
        }
    }
}
