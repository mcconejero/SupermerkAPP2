package com.triana.salesianos.supermerkapp2.fragments;

import android.content.Context;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.fragments.MarketFragment.OnListFragmentInteractionListener;
import com.triana.salesianos.supermerkapp2.models.MarketResponse;

import java.util.List;


public class MyMarketRecyclerViewAdapter extends RecyclerView.Adapter<MyMarketRecyclerViewAdapter.ViewHolder> {

    private final List<MarketResponse> mValues;
    private final OnListFragmentInteractionListener mListener;
    Context ctx;

    public MyMarketRecyclerViewAdapter(Context context, List<MarketResponse> items, OnListFragmentInteractionListener listener) {
        mValues = items;
        mListener = listener;
        ctx = context;
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
